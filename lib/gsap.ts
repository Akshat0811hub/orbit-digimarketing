"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(ScrollTrigger, Flip, Draggable);
export { gsap, ScrollTrigger, Flip, Draggable };
