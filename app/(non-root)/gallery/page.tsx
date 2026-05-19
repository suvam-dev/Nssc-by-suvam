"use client"
import React from 'react'
import DomeGallery from '@/components/DomeGallery';

export default function GalleryPage() {
    return (
        <div className="fixed inset-0 w-full h-full bg-black flex justify-center items-center overflow-hidden">
            <DomeGallery
                fit={0.4}
                minRadius={300}
                maxVerticalRotationDeg={0}
                segments={22}
                dragDampening={1}
                grayscale={false}
            />
        </div>
    );
}