'use client'
import {useEffect, useState} from "react";
import './ButtonBaktoTop.css'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ButtonBackToTop = () => {
    const [backToTopButton, setBackToTopButton] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll", () =>{
            if (window.scrollY > 100) {
                setBackToTopButton(true)
            } else {
                setBackToTopButton(false)

            }
        })
    }, [window.scrollY])
    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",

        })
    }
    return (
        <>{backToTopButton &&
            <button className={backToTopButton ? "btn-scroll-up" : "btn-scroll-down"}
                    onClick={scrollUp}
            >
                <KeyboardArrowUpIcon/>
            </button>
        }
        </>
    )
}
export default ButtonBackToTop