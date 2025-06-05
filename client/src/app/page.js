import Faqs from '@/sections/Faqs'
import Features from '@/sections/Features'
import Footer from '@/sections/Footer'
import Hero from '@/sections/Hero'
import Introduction from '@/sections/Introduction'
import Navbar from '@/sections/Navbar'


const Home = () => {
  return (
    <main className='bg-gradient-to-bottom'>
        <Navbar/>
        <Hero/>
        <Introduction/>
        <Features/>
        <Faqs/>
        <Footer/>
    </main>
  )
}

export default Home;