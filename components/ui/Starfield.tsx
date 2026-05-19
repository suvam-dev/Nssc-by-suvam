"use client";

import React, { useEffect, useRef } from "react";

interface StarfieldProps {
  starColor?: string;
  bgColor?: string;
  mouseAdjust?: boolean;
  tiltAdjust?: boolean;
  easing?: number;
  clickToWarp?: boolean;
  hyperspace?: boolean;
  warpFactor?: number;
  opacity?: number;
  speed?: number;
  quantity?: number;
}

// Star data layout (Float64Array per star, packed into one flat array):
// [0]=x  [1]=y  [2]=z  [3]=px  [4]=py  [5]=ox  [6]=oy  [7]=visible(0|1)
const FIELDS = 8;

const Starfield: React.FC<StarfieldProps> = ({
  starColor = "rgba(255,255,255,0.85)",
  bgColor = "#000000",
  mouseAdjust = false,
  tiltAdjust = false,
  easing = 1,
  clickToWarp = false,
  hyperspace = false,
  warpFactor = 10,
  opacity = 0.1,
  speed = 0.35,
  quantity = 600,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // All mutable state lives in refs — never triggers React re-renders
  const w = useRef(0);
  const h = useRef(0);
  const cx = useRef(0); // center x
  const cy = useRef(0); // center y
  const depth = useRef(0); // z range
  const colorRatio = useRef(0);

  const stars = useRef<Float64Array | null>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const cursorX = useRef(0);
  const cursorY = useRef(0);
  const cursorSet = useRef(false);
  const needsResize = useRef(true); // flag set by ResizeObserver

  // Props synced to Refs so animation loop gets updates without triggering full component re-renders
  const speedRef = useRef(speed);
  const warpFactorRef = useRef(warpFactor);
  const opacityRef = useRef(opacity);
  const hyperspaceRef = useRef(hyperspace);
  const mouseAdjustRef = useRef(mouseAdjust);
  const isClickWarping = useRef(false);

  useEffect(() => {
    speedRef.current = speed;
    warpFactorRef.current = warpFactor;
    opacityRef.current = opacity;
    hyperspaceRef.current = hyperspace;
    mouseAdjustRef.current = mouseAdjust;
  }, [speed, warpFactor, opacity, hyperspace, mouseAdjust]);

  const ratio = quantity / 2;

  // ── Initialise / reset stars ──────────────────────────────────────────────
  const spawnStars = () => {
    const buf = new Float64Array(quantity * FIELDS);
    for (let i = 0; i < quantity; i++) {
      const base = i * FIELDS;
      buf[base + 0] = Math.random() * w.current * 2 - cx.current * 2;
      buf[base + 1] = Math.random() * h.current * 2 - cy.current * 2;
      buf[base + 2] = Math.round(Math.random() * depth.current);
    }
    stars.current = buf;
  };

  // ── Apply current viewport dimensions ────────────────────────────────────
  const applyResize = (canvas: HTMLCanvasElement) => {
    const parent = canvas.parentElement;
    if (!parent) return;

    const newW = parent.clientWidth;
    const newH = parent.clientHeight;
    if (newW === 0 || newH === 0) return;

    const oldW = w.current;
    const oldH = h.current;

    w.current = newW;
    h.current = newH;
    cx.current = Math.round(newW / 2);
    cy.current = Math.round(newH / 2);
    depth.current = (newW + newH) / 2;
    colorRatio.current = 1 / depth.current;

    canvas.width = newW;
    canvas.height = newH;

    // Seed cursor to center if not set
    if (!cursorSet.current) {
      cursorX.current = cx.current;
      cursorY.current = cy.current;
      cursorSet.current = true;
    }

    // Rescale existing star positions
    if (stars.current && oldW > 0 && oldH > 0) {
      const rw = newW / oldW;
      const rh = newH / oldH;
      const buf = stars.current;
      for (let i = 0; i < quantity; i++) {
        const base = i * FIELDS;
        buf[base + 0] *= rw;
        buf[base + 1] *= rh;
        // recompute projected positions
        buf[base + 3] = cx.current + (buf[base + 0] / buf[base + 2]) * ratio;
        buf[base + 4] = cy.current + (buf[base + 1] / buf[base + 2]) * ratio;
      }
    } else {
      spawnStars();
    }

    needsResize.current = false;
  };

  // ── Update star positions ─────────────────────────────────────────────────
  const update = () => {
    if (!stars.current) return;

    // Smooth cursor → mouse delta
    mouseX.current = (cursorX.current - cx.current) / easing;
    mouseY.current = (cursorY.current - cy.current) / easing;

    const mx16 = mouseAdjustRef.current ? (mouseX.current >> 4) : 0;
    const my16 = mouseAdjustRef.current ? (mouseY.current >> 4) : 0;

    // Compute dynamic warp speed from current props/state
    const isWarping = hyperspaceRef.current || isClickWarping.current;
    const csp = isWarping ? speedRef.current * warpFactorRef.current : speedRef.current;

    const W = w.current;
    const H = h.current;
    const CX = cx.current;
    const CY = cy.current;
    const D = depth.current;
    const buf = stars.current;

    for (let i = 0; i < quantity; i++) {
      const base = i * FIELDS;
      let visible = 1;

      // Save previous projected position
      buf[base + 5] = buf[base + 3];
      buf[base + 6] = buf[base + 4];

      // Drift x based on mouse coordinates
      buf[base + 0] += mx16;
      if (buf[base + 0] > CX * 2) { buf[base + 0] -= W * 2; visible = 0; }
      else if (buf[base + 0] < -(CX * 2)) { buf[base + 0] += W * 2; visible = 0; }

      // Drift y based on mouse coordinates
      buf[base + 1] += my16;
      if (buf[base + 1] > CY * 2) { buf[base + 1] -= H * 2; visible = 0; }
      else if (buf[base + 1] < -(CY * 2)) { buf[base + 1] += H * 2; visible = 0; }

      // Move along z (towards viewer)
      buf[base + 2] -= csp;
      if (buf[base + 2] > D) { buf[base + 2] -= D; visible = 0; }
      else if (buf[base + 2] <= 0) { buf[base + 2] += D; visible = 0; }

      // Project to screen
      buf[base + 3] = CX + (buf[base + 0] / buf[base + 2]) * ratio;
      buf[base + 4] = CY + (buf[base + 1] / buf[base + 2]) * ratio;
      buf[base + 7] = visible;
    }
  };

  // ── Draw frame ────────────────────────────────────────────────────────────
  const draw = (ctx: CanvasRenderingContext2D) => {
    if (!stars.current) return;

    const isWarping = hyperspaceRef.current || isClickWarping.current;

    // In hyperspace/warp mode, clear with alpha (low opacity) to leave gorgeous glowing trails
    if (isWarping) {
      ctx.fillStyle = `rgba(0, 0, 0, ${opacityRef.current})`;
    } else {
      ctx.fillStyle = bgColor;
    }
    ctx.fillRect(0, 0, w.current, h.current);

    const buf = stars.current;
    const W = w.current;
    const H = h.current;
    const CR = colorRatio.current;

    for (let i = 0; i < quantity; i++) {
      const base = i * FIELDS;
      if (
        buf[base + 7] === 0 ||
        buf[base + 3] <= 0 ||
        buf[base + 3] >= W ||
        buf[base + 4] <= 0 ||
        buf[base + 4] >= H
      ) continue;

      // Calculate size and opacity based on depth (z coordinate)
      const relativeDepth = 1 - CR * buf[base + 2];

      // If warping, stars stretch into streaks (lines) instead of static dots
      if (isWarping) {
        ctx.strokeStyle = starColor;
        ctx.lineWidth = relativeDepth * 2.0;
        ctx.beginPath();
        ctx.moveTo(buf[base + 5], buf[base + 6]);
        ctx.lineTo(buf[base + 3], buf[base + 4]);
        ctx.stroke();
      } else {
        // Otherwise, render as beautiful circular dots of varying sizes/opacities
        const size = 0.8 + relativeDepth * 2.0;
        const opacityVal = 0.5 + relativeDepth * 0.5;

        ctx.beginPath();
        ctx.arc(
          buf[base + 3],
          buf[base + 4],
          size < 0.4 ? 0.4 : size,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${opacityVal < 0.1 ? 0.1 : opacityVal})`;
        ctx.fill();
      }
    }
  };

  // ── Main animation loop ───────────────────────────────────────────────────
  const loop = (ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (needsResize.current) {
      applyResize(canvas);
    }

    update();
    draw(ctx);
    rafRef.current = requestAnimationFrame(() => loop(ctx));
  };

  // ── Lifecycle ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    applyResize(canvas);

    const ro = new ResizeObserver(() => {
      needsResize.current = true;
    });
    const parent = canvas.parentElement;
    if (parent) ro.observe(parent);

    rafRef.current = requestAnimationFrame(() => loop(ctx));

    // Mouse handlers
    const onMouseMove = (e: MouseEvent) => {
      cursorX.current = e.clientX;
      cursorY.current = e.clientY;
    };
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        cursorX.current = w.current / 2 + e.gamma * 5;
        cursorY.current = h.current / 2 + e.beta * 5;
      }
    };
    const onMouseDown = () => { isClickWarping.current = true; };
    const onMouseUp = () => { isClickWarping.current = false; };

    // Register event listeners according to configuration props
    if (mouseAdjust) window.addEventListener("mousemove", onMouseMove);
    if (tiltAdjust) window.addEventListener("deviceorientation", onTilt);
    if (clickToWarp) {
      window.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      if (mouseAdjust) window.removeEventListener("mousemove", onMouseMove);
      if (tiltAdjust) window.removeEventListener("deviceorientation", onTilt);
      if (clickToWarp) {
        window.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mouseup", onMouseUp);
      }
    };
  }, [mouseAdjust, tiltAdjust, clickToWarp]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100%", height: "100%", position: "absolute", inset: 0 }}
    />
  );
};

export { Starfield };
