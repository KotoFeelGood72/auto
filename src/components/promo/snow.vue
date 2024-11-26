<template>
  <div class="snow">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

class WaveNoise {
  constructor(requiredWaves, speed) {
    this.wavesSet = [];
    this.speed = speed || 1;

    for (let i = 0; i < requiredWaves; i++) {
      this.wavesSet.push(Math.random() * 360);
    }
  }

  getValue() {
    let blendedWave = 0;
    this.wavesSet.forEach((e) => {
      blendedWave += Math.sin((e / 180) * Math.PI);
    });
    return (blendedWave / this.wavesSet.length + 1) / 2;
  }

  update() {
    this.wavesSet.forEach((e, i) => {
      this.wavesSet[i] = (e + Math.random() * (i + 1) * this.speed) % 360;
    });
  }
}

const canvasRef = ref(null);

onMounted(() => {
  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");

  const resize = function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  };

  resize();
  window.addEventListener("resize", resize);

  const configSnow = {
    maxParticleSize: 7,
    swingSpeed: 2.3,
    fallSpeed: 3,
    spawn: 4,
  };

  const random = (min, max) => Math.random() * (max - min) + min;

  const circle = function (x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fill();
  };

  class SnowParticle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = -configSnow.maxParticleSize;
      this.z = random(0.3, 1);
      this.size = this.z * configSnow.maxParticleSize;
      this.noise = new WaveNoise(10, 0.7);
    }

    draw() {
      ctx.globalAlpha = this.z;
      circle(this.x, this.y, this.size);
    }

    move() {
      let c = this.noise.getValue() * 2 - 1;

      this.x +=
        c * configSnow.swingSpeed * this.z +
        (this.z - 0.65) * configSnow.swingSpeed * 0.4;
      this.y += (1 - Math.abs(c)) * configSnow.fallSpeed * this.z;

      this.noise.update();
    }
  }

  class Snow {
    constructor() {
      this.particles = [];
      this.spawn = 0;
    }

    addParticle() {
      this.spawn++;
      if (this.spawn >= configSnow.spawn) {
        this.spawn = 0;
        this.particles.push(new SnowParticle());
      }
    }

    deleteParticles() {
      this.particles = this.particles.filter(
        (particle) => particle.y <= canvas.height + configSnow.maxParticleSize
      );
    }

    init() {
      this.addParticle();
      this.deleteParticles();

      ctx.save();
      ctx.fillStyle = "white";

      this.particles.forEach((particle) => {
        particle.move();
        particle.draw();
      });

      ctx.restore();
    }
  }

  const snow = new Snow();

  const loop = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snow.init();
    requestAnimationFrame(loop);
  };

  loop();
});
</script>

<style scoped lang="scss">
.snow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
  user-select: none;
}
</style>
