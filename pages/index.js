import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'


import Header from '@/Components/Home/Header/Header'
import Searchfield from '@/Components/Home/Searchfield/Searchfield'
import SellAndRent from '@/Components/Home/SellAndRent/SellAndRent'
import Division from '@/Components/Home/Division/Division'
import Advertise from '@/Components/Home/Advertise/Advertise'
import About from '@/Components/Home/About/About'
import Review from '@/Components/Home/Review/Review'
import Branding from '@/Components/Home/Branding/Branding'
import PhotoGallery from '@/Components/Home/PhotoGallery/PhotoGallery'
import ContactUs from '@/Components/Home/Contactus/Contactus'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>FareBD</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='max-w-[1440px] w-[95%] mx-auto'>


        <Header></Header>
        <Searchfield></Searchfield>
        <SellAndRent></SellAndRent>
        <Division></Division>
        <Advertise></Advertise>
        <About></About>
        <Review></Review>
        <Branding></Branding>
        <PhotoGallery></PhotoGallery>
        <ContactUs></ContactUs>


      </main>
    </>
  )
}
