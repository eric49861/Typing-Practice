<template>
    <div class="body">
        <h1 class="title">眼睛盯着屏幕</h1>
        <div class="keyboard">
            <ul class="row row-0">
                <li class="pinky" id="esc">ESC</li>
                <li ref="one" class="pinky" id="1">1</li>
                <li ref="two" class="ring" id="2">2</li>
                <li ref="three" class="middle" id="3">3</li>
                <li ref="four" class="pointer1st" id="4">4</li>
                <li ref="five" class="pointer2nd" id="5">5</li>
                <li ref="six" class="pointer2nd" id="6">6</li>
                <li ref="seven" class="pointer1st" id="7">7</li>
                <li ref="eight" class="middle" id="8">8</li>
                <li ref="nine" class="ring" id="9">9</li>
                <li ref="zero" class="pinky" id="0">0</li>
                <li class="pinky" id="-">-</li>
                <li class="pinky" id="=">+</li>
                <li class="pinky" id="back">BACK</li>
            </ul>
            <ul class="row row-1">
                <li class="pinky" id="tab">TAB</li>
                <li ref="Q" class="pinky" id="Q">Q</li>
                <li ref="W" class="ring" id="W">W</li>
                <li ref="F" class="middle" id="F">F</li>
                <li ref="P" class="pointer1st" id="P">P</li>
                <li ref="G" class="pointer2nd" id="G">G</li>
                <li ref="J" class="pointer2nd" id="J">J</li>
                <li ref="L" class="pointer1st" id="L">L</li>
                <li ref="U" class="middle" id="U">U</li>
                <li ref="Y" class="ring" id="Y">Y</li>
                <li class="ring" id=";">;</li>
                <li class="pinky" id="[">[</li>
                <li class="pinky" id="]">]</li>
                <li class="pinky" id="\">\</li>
            </ul>
            <ul class="row row-2">
                <li class="pinky" id="caps">BACK</li>
                <li ref="A" class="pinky" id="A">A</li>
                <li ref="R" class="ring" id="R">R</li>
                <li ref="S" class="middle" id="S">S</li>
                <li ref="T" class="pointer1st" id="T">T</li>
                <li ref="D" class="pointer2nd" id="D">D</li>
                <li ref="H" class="pointer2nd" id="H">H</li>
                <li ref="N" class="pointer1st" id="N">N</li>
                <li ref="E" class="middle" id="E">E</li>
                <li ref="I" class="ring" id="I">I</li>
                <li ref="O" class="pinky" id="O">O</li>
                <li class="pinky" id="'">''</li>
                <li class="pinky" id="enter">ENTER</li>
            </ul>
            <ul class="row row-3">
                <li class="pinky" id="left-shift">SHIFT</li>
                <li ref="Z" class="pinky" id="Z">Z</li>
                <li ref="X" class="ring" id="X">X</li>
                <li ref="C" class="middle" id="C">C</li>
                <li ref="V" class="pointer1st" id="V">V</li>
                <li ref="B" class="pointer2nd" id="B">B</li>
                <li ref="K" class="pointer2nd" id="K">K</li>
                <li ref="M" class="pointer1st" id="M">M</li>
                <li class="middle" id=",">,</li>
                <li class="ring" id=".">.</li>
                <li class="pinky" id="/">/</li>
                <li class="pinky" id="right-shift">SHIFT</li>
            </ul>
        </div>
        <h1 class="title">把手放在键盘上</h1>
        <h2 class="footer">Made in China!</h2>
    </div>
</template>

<script>
export default {
    mounted() {
        this.targetRandomKey();
    },
    methods: {
        getRandomNumber(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        getRandomKey() {
            const keys = [
                ..."123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            ];
            return keys[this.getRandomNumber(0, keys.length - 1)];
        },
        targetRandomKey() {
            let r = this.getRandomKey()
            let temp = this.map[r]
            if (temp == undefined) {
                temp = r
            }
            const key = this.$refs[temp];
            key.classList.add("selected");
            this.start = Date.now();
        },
        getTimestamp() {
            return Math.floor(Date.now() / 1000);
        },
        handleKeyUp(event) {
            const keyPressed = event.key.toUpperCase();
            let key = this.map[keyPressed]
            if (key == undefined) {
                key = keyPressed
            }
            const keyElement = this.$refs[key]
            const highlightedKey = document.querySelector(".selected");

            keyElement.classList.add("hit");
            keyElement.addEventListener("animationend", () => {
                keyElement.classList.remove("hit");
            });

            if (keyPressed === highlightedKey.innerHTML) {
                const timestamps = this.timestamps || [];
                timestamps.unshift(this.getTimestamp());
                const elapsedTime = timestamps[0] - timestamps[1];
                // console.log(`Character per minute ${60 / elapsedTime}`);
                highlightedKey.classList.remove("selected");
                this.timestamps = timestamps.slice(0, 2);
                this.targetRandomKey();
            }
        },
    },
    data() {
        return {
            start: 0,
            timestamps: [],
            map: {
                '1': "one", '2': "two", '3': "three", '4': "four", '5': "five", "6": "six", "7": "seven", 8: "eight", "9": "nine", "0": "zero"
            }
        };
    },
    created() {
        document.addEventListener("keyup", this.handleKeyUp);
    },
    beforeDestroy() {
        document.removeEventListener("keyup", this.handleKeyUp);
    },
};
</script>

<style scoped>
.body {
    background-color: black;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    max-height: 100vh;
}

.title {
    color: mintcream;
    text-transform: uppercase;
    margin-top: 3em;
    margin-bottom: 3em;
    font-size: 1em;
    letter-spacing: 0.3em;
}

.footer {
    color: mintcream;
    text-transform: uppercase;
    margin-top: 1em;
    font-size: 0.75em;
    letter-spacing: 0.3em;
}

.keyboard {
    display: flex;
    flex-direction: column;
}

.row {
    list-style: none;
    display: flex;
    padding: 0px;
    margin: 4px;
}

li {
    height: 3em;
    width: 3em;
    color: rgba(0, 0, 0, 0.7);
    border-radius: 0.4em;
    line-height: 3em;
    letter-spacing: 1px;
    margin: 0.3em;
    transition: 0.3s;
    text-align: center;
    font-size: 1em;
}

#tab {
    width: 5em;
}

#caps {
    width: 6em;
}

#left-shift {
    width: 8em;
}

#enter {
    width: 6em;
}

#right-shift {
    width: 8em;
}

#back {
    width: 5em;
}

.pinky {
    background-color: crimson;
    border: 2px solid crimson;
}

.pinky.selected {
    color: crimson;
}

.ring {
    background-color: coral;
    border: 2px solid coral;
}

.ring.selected {
    color: coral;
}

.middle {
    background-color: darkorange;
    border: 2px solid darkorange;
}

.middle.selected {
    color: darkorange;
}

.pointer1st {
    background-color: gold;
    border: 2px solid gold;
}

.pointer1st.selected {
    color: gold;
}

.pointer2nd {
    background-color: khaki;
    border: 2px solid khaki;
}

.pointer2nd.selected {
    color: khaki;
}

.fill-out-key {
    background-color: slategrey;
    border: 2px solid slategrey;
}

.selected {
    background-color: transparent;
    -webkit-animation: vibrate-1 0.3s linear infinite both;
    animation: vibrate-1 0.3s linear infinite both;
}

/* ----------------------------------------------
   * Generated by Animista
   * Licensed under FreeBSD License.
   * See http://animista.net/license for more info. 
   * w: http://animista.net, t: @cssanimista
   * ---------------------------------------------- */

.hit {
    -webkit-animation: hit 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    animation: hit 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

@-webkit-keyframes hit {
    0% {
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
    }

    100% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}

@keyframes hit {
    0% {
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
    }

    100% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}

@-webkit-keyframes vibrate-1 {
    0% {
        -webkit-transform: translate(0);
        transform: translate(0);
    }

    20% {
        -webkit-transform: translate(-2px, 2px);
        transform: translate(-2px, 2px);
    }

    40% {
        -webkit-transform: translate(-2px, -2px);
        transform: translate(-2px, -2px);
    }

    60% {
        -webkit-transform: translate(2px, 2px);
        transform: translate(2px, 2px);
    }

    80% {
        -webkit-transform: translate(2px, -2px);
        transform: translate(2px, -2px);
    }

    100% {
        -webkit-transform: translate(0);
        transform: translate(0);
    }
}

@keyframes vibrate-1 {
    0% {
        -webkit-transform: translate(0);
        transform: translate(0);
    }

    20% {
        -webkit-transform: translate(-2px, 2px);
        transform: translate(-2px, 2px);
    }

    40% {
        -webkit-transform: translate(-2px, -2px);
        transform: translate(-2px, -2px);
    }

    60% {
        -webkit-transform: translate(2px, 2px);
        transform: translate(2px, 2px);
    }

    80% {
        -webkit-transform: translate(2px, -2px);
        transform: translate(2px, -2px);
    }

    100% {
        -webkit-transform: translate(0);
        transform: translate(0);
    }
}
</style>