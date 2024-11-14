import { useEffect } from "react";
import anime from "animejs";

function Footer() {
  useEffect(() => {
    // Wrap every letter in a span
    const textWrapper = document.querySelector(".ml11 .letters");
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /([^\x00-\x80]|\w)/g,
      "<span class='letter'>$&</span>"
    );

    anime
      .timeline({ loop: true })
      .add({
        targets: ".ml11 .line",
        scaleY: [0, 1],
        opacity: [0.5, 1],
        easing: "easeOutExpo",
        duration: 700,
      })
      .add({
        targets: ".ml11 .line",
        translateX: [
          0,
          Math.min(
            document.querySelector(".ml11 .letters").getBoundingClientRect()
              .width + 20, // Add padding for smoother appearance
            window.innerWidth - 40 // Limit to window width
          ),
        ],
        easing: "easeOutExpo",
        duration: 700,
        delay: 100,
      })
      .add({
        targets: ".ml11 .letter",
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 600,
        offset: "-=775",
        delay: (el, i) => 34 * (i + 1),
      })
      .add({
        targets: ".ml11",
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000,
      });
  }, []);

  return (
    <div className="mt-4 h-20 bg-black flex justify-center items-center px-4 overflow-hidden">
      <h1 className="ml11 text-white font-bold text-xl md:text-3xl text-center">
        <span className="text-wrapper relative inline-block">
          <span className="line line1 absolute left-0 h-full w-[2px] md:w-[3px] bg-white opacity-0"></span>
          <span className="letters">♥ Made by Hammad Alam</span>
        </span>
      </h1>
    </div>
  );
}

export default Footer;
