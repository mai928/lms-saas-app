import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/CTA'
import { recentSessions } from '@/constants'
import React from 'react'

const Page = () => {
  return (
    <main>
      <h1 className=''>Populaor Companions</h1>
      <section className='home-section'>
        <CompanionCard id='123' subject='Science' name='Neura the Brainy Explorer' topic='Topic: Neural Network of the Brain' duration='45 mins duration' color='#e5d0ff'/>
        <CompanionCard id='456' subject='Science' name='Neura the Brainy Explorer' topic='Topic: Neural Network of the Brain' duration='45 mins duration' color='#ffda6e'/>
        <CompanionCard id='789' subject='Science' name='Neura the Brainy Explorer' topic='Topic: Neural Network of the Brain' duration='45 mins duration' color='#bde7ff'/>
      </section>

      <section className='home-section'>
        <CompanionList title='Recently Completed Sessions'
        companions={recentSessions}
        className='w-2/3 max-lg:w-full'
        />
        <CTA/>
      </section>
    </main>

  )
}

export default Page