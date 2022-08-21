import logo from "../public/images/logo.png"

import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Link from "next/link"

export default function Header() {

    const router = useRouter()

    const pageview = (url) => {
        window.gtag('config', 'UA-123751778-1', {
          page_path: url,
        })
    }

    useEffect(() => {
        const navbar = document.getElementById("navbar")
        const handleRouteChange = (url) => {
            navbar.classList.remove('fixed')
            navbar.classList.add('hidden')
            pageview(url)
        }
    
        router.events.on('routeChangeStart', handleRouteChange)
    
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }
    })
    
    const toggleNavBar = () => {
        const navbar = document.getElementById("navbar")
        if(navbar.classList.contains('hidden')) {
            navbar.classList.add('fixed')
            navbar.classList.remove('hidden')
        } else {
            navbar.classList.remove('fixed')
            navbar.classList.add('hidden')
        }
    }

    return(
        <header className="border-b border-primary px-5">
            <div className="max-w-6xl flex justify-between items-center mx-auto min-h-[100px]">
                <Link href={"/"}>
                    <a className="relative h-[40px] w-[50px]">
                        <Image src={logo} layout={'fill'} objectFit={'contain'} className="object-left" alt="Logo de Florent Vandroy" />
                    </a>
                </Link>
                <div className="float-right lg:hidden cursor-pointer" onClick={toggleNavBar}>
                    <FontAwesomeIcon icon={faBars} size="2x" aria-label="Ouvrir le menu" />
                </div>
                <nav className="lg:relative lg:w-full lg:bg-transparent overflow-y-auto hidden lg:block top-0 right-0 w-2/3 h-full bg-gray-800" id="navbar">
                    <div className="float-right pt-6 pr-6 cursor-pointer lg:hidden" onClick={toggleNavBar}>
                        <FontAwesomeIcon icon={faClose} size="2x" aria-label="Fermer le menu" />
                    </div>
                    <ul className="w-full flex flex-col lg:flex-row justify-end items-center pt-5 lg:pt-0">
                        <li className={router.pathname == '/' ? 'border-primary' : ''}><Link href="/"><a>Accueil</a></Link></li>
                        <li className={router.pathname.includes('/blog') ? 'border-primary' : ''}><Link href="/blog"><a>Blog</a></Link></li>
                        <li className={router.pathname.includes('/realisations') ? 'border-primary' : ''}><Link href="/realisations"><a>Réalisations</a></Link></li>
                        <li className={router.pathname.includes('/contact') ? 'border-primary' : ''}><Link href="/contact"><a>Contact</a></Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}