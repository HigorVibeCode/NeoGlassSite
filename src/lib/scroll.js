import { useEffect, useRef, useState } from 'react'

export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))

// Fatia um trecho do progresso e devolve 0..1 dentro dele.
export const range = (p, a, b) => clamp((p - a) / (b - a))

// Suaviza as pontas para o movimento não começar nem parar seco.
export const ease = (t) => t * t * (3 - 2 * t)

export const lerp = (a, b, k) => a + (b - a) * k

// A cena toca sozinha quando entra na tela, e recomeça se voltar.
export function useAutoplay(ref, duracao = 5200, atraso = 450) {
  const [p, setP] = useState(0)
  const tocando = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setP(1)
      return
    }

    let raf = 0
    let espera = 0

    const tocar = () => {
      cancelAnimationFrame(raf)
      clearTimeout(espera)
      setP(0)
      espera = setTimeout(() => {
        const t0 = performance.now()
        const passo = (agora) => {
          const k = clamp((agora - t0) / duracao)
          setP(k)
          if (k < 1) raf = requestAnimationFrame(passo)
        }
        raf = requestAnimationFrame(passo)
      }, atraso)
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!tocando.current) {
            tocando.current = true
            tocar()
          }
        } else {
          tocando.current = false
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      clearTimeout(espera)
    }
  }, [ref, duracao, atraso])

  return p
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const on = (e) => setReduced(e.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

export function useMedia(consulta) {
  const [bate, setBate] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(consulta)
    setBate(mq.matches)
    const on = (e) => setBate(e.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [consulta])
  return bate
}

// No celular a câmera se aproxima do que importa agora, em vez de mostrar
// o desenho inteiro pequeno. Estas duas funções fazem esse enquadramento.
export function enquadrar(r, aspecto) {
  const a = r.w / r.h
  if (a > aspecto) {
    const h = r.w / aspecto
    return { x: r.x, y: r.y - (h - r.h) / 2, w: r.w, h }
  }
  const w = r.h * aspecto
  return { x: r.x - (w - r.w) / 2, y: r.y, w, h: r.h }
}

export const misturarRet = (a, b, k) => ({
  x: lerp(a.x, b.x, k),
  y: lerp(a.y, b.y, k),
  w: lerp(a.w, b.w, k),
  h: lerp(a.h, b.h, k),
})

export const caixa = (r) => `${r.x} ${r.y} ${r.w} ${r.h}`
