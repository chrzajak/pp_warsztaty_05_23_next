import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {Country} from "@/models/Country";
import {useRouter} from "next/router";

const inter = Inter({ subsets: ['latin'] })

export default function Home(props) {
  const router = useRouter();

  return (
      <>
        <header>
          <h1>Country list</h1>
        </header>
        <ul>
          {props.countries.map((country, index) =>
              <li key={index}>
                <button onClick={() => {router.push(`/details/${country.name.common}`)}}>{country.name.common}</button>
                <br></br>
              </li>
          )}
        </ul>
      </>
  )
}

export async function getStaticProps() {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,population,area",
        {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }})
    const data = await response.json() as Country[] || [];
    return {
        props: {
            countries: data
        },
        revalidate: 3600
    }
}
