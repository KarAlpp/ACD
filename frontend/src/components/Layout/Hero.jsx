    import React, { useState, useRef, useEffect } from 'react'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'

    gsap.registerPlugin(ScrollTrigger)

    const Hero = () => {
    const [currentVideo, setCurrentVideo] = useState('hero-2.mp4')
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [showPreview, setShowPreview] = useState(false)

    const previewRef = useRef(null)
    const videoContainerRef = useRef(null)

    // Diğer videoyu bulmak için yardımcı fonksiyon
    const getPreviewVideo = () => {
        return currentVideo === 'hero-2.mp4' ? 'hero-3.mp4' : 'hero-2.mp4'
    }

    // Mouse hareket ettikçe pozisyonu güncelle
    const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY })
    }

    // Videoyu tıklamayla değiştir (toggle mantığı)
    const handleVideoSwitch = () => {
        setCurrentVideo(getPreviewVideo())
    }

    // GSAP dairesel maske animasyonu
    useEffect(() => {
        if (previewRef.current) {
        gsap.to(previewRef.current, {
            clipPath: showPreview
            ? `circle(100px at ${mousePos.x}px ${mousePos.y}px)`
            : `circle(0px at ${mousePos.x}px ${mousePos.y}px)`,
            duration: 0.2,
            ease: 'power2.out',
        })
        }
    }, [mousePos, showPreview])

    // Scroll ile küçülme ve kaybolma animasyonu
    useEffect(() => {
        if (videoContainerRef.current) {
        gsap.fromTo(videoContainerRef.current, 
            { scale: 1, opacity: 1 },
            { 
            scale: 0.5, 
            opacity: 0, 
            scrollTrigger: {
                trigger: videoContainerRef.current,
                start: "top top",
                end: "top 30%",
                scrub: true, // Scroll ile eş zamanlı
            }
            }
        )
        }
    }, [])

    return (
        <section
        ref={videoContainerRef}
        style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowPreview(true)}  // Hover'da daire göster
        onMouseLeave={() => setShowPreview(false)} // Mouse çıkınca daireyi kapat
        onClick={handleVideoSwitch}                // Tıklayınca video değiştir
        >
        {/* Aktif video */}
        <video
            src={`/videos/${currentVideo}`}
            type="video/mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            }}
        />

        {/* Dairesel önizleme - her zaman aktif olacak, hep diğer videoyu gösterecek */}
        <div
            ref={previewRef}
            style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            overflow: 'hidden',
            zIndex: 2,
            pointerEvents: 'none',
            clipPath: 'circle(0px at 0px 0px)', // Başlangıçta görünmez
            }}
        >
            <video
            src={`/videos/${getPreviewVideo()}`}
            type="video/mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
            }}
            />
        </div>
        </section>
    )
    }

    export default Hero
