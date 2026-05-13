import ChartMentorCommunityPage from "./common/CommunityPage"
import ChartMentorContactPage from "./common/ContactPage"
import ChartMentorFeatures from "./common/FeaturesSection"
import { ChartMentorFooter } from "./common/Footer"
import ChartMentorHeader from "./common/Header"
import ChartMentorHero from "./common/HeroSection"
import ChartMentorMentorshipPage from "./common/MentorShipSection"
import ChartMentorPricing from "./common/PricingSection"

function App() {


  return (
    <>
      <ChartMentorHeader />
      <ChartMentorHero />
      <ChartMentorFeatures />
      <ChartMentorPricing />
      <ChartMentorMentorshipPage />
      <ChartMentorCommunityPage />
      <ChartMentorContactPage />
      <ChartMentorFooter />
    </>
  )
}

export default App
