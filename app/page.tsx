import { Epilogue } from '@/components/miel/epilogue'
import { Hero } from '@/components/miel/hero'
import { Manifesto } from '@/components/miel/manifesto'
import { Marquee } from '@/components/miel/marquee'
import { Meliponas } from '@/components/miel/meliponas'
import { Preloader } from '@/components/miel/preloader'
import { Purity } from '@/components/miel/purity'
import { Showcase } from '@/components/miel/showcase'
import { SiteFooter } from '@/components/miel/site-footer'
import { SiteHeader } from '@/components/miel/site-header'
import { Terroir } from '@/components/miel/terroir'

export default function Page() {
  return (
    <>
      <Preloader />
      <SiteHeader />
      <main className="relative flex flex-col bg-forest-dark text-cream">
        <Hero />
        <Marquee />
        <Manifesto />
        <Terroir />
        <Meliponas />
        <Showcase />
        <Purity />
        <Epilogue />
      </main>
      <SiteFooter />
    </>
  )
}
