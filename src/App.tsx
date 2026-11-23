import { useState } from 'react'
import { ApplicationsShowcase } from './components/ApplicationsShowcase'
import { AssetExplorer } from './components/AssetExplorer'
import { ArtworkPreview } from './components/ArtworkPreview'
import type { PreviewItem } from './components/ArtworkPreview'
import { CompositionPlayground } from './components/CompositionPlayground'
import { ClosingSection } from './components/ClosingSection'
import { ExperimentsIndex } from './components/ExperimentsIndex'
import { GalleryArchive } from './components/GalleryArchive'
import { HeroGallery } from './components/HeroGallery'
import { ModularPlayground } from './components/ModularPlayground'
import { MotionPoster } from './components/MotionPoster'
import { SiteFooter } from './components/SiteFooter'
import { SiteNavigation } from './components/SiteNavigation'
import { ScrollReveal } from './components/ScrollReveal'
import { VisualStory } from './components/VisualStory'
import { WorkflowScene } from './components/WorkflowScene'

export default function App() {
  const [preview, setPreview] = useState<PreviewItem | null>(null)

  return (
    <div className="landing-page">
      <SiteNavigation />
      <main>
        <HeroGallery onPreview={setPreview} />
        <VisualStory />
        <CompositionPlayground />
        <ApplicationsShowcase />
        <ExperimentsIndex />
        <GalleryArchive onPreview={setPreview} />
        <AssetExplorer onPreview={setPreview} />
        <MotionPoster />
        <WorkflowScene />
        <ModularPlayground />
        <ClosingSection />
      </main>
      <SiteFooter />
      <ScrollReveal />
      <ArtworkPreview item={preview} onClose={() => setPreview(null)} />
    </div>
  )
}
