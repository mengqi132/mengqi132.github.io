'use client';

import Sidebar, { MobileChrome } from './Sidebar';
import Hero from './Hero';
import Publications from './Publications';
import Education from './Education';
import Contact from './Contact';

export default function SiteShell() {
  return (
    <>
      <MobileChrome />
      <div className="site">
        <Sidebar />
        <main className="content">
          <Hero />
          <Publications />
          <Education />
          <Contact />
        </main>
      </div>
    </>
  );
}
