import {useRouter} from "next/router";
import {Country} from "@/models/Country";
import {CountryDetails} from "@/models/CountryDetails";

export default function DetaislPage(props) {
    const router = useRouter();

    return (
        <>
            <header>
                <h1>{props.countryDetails?.name.common}</h1>
            </header>
            {props.countryDetails && (
                <p>
                    area: {props.countryDetails?.area}<br></br>
                    capital: {props.countryDetails?.capital.map((capital, index) => (index > 0) ? `,  ${capital}` : capital)}<br></br>
                </p>
            )}
            <button onClick={() => {router.push(`/`)}}>Back</button>
        </>
    )
}

export async function getStaticProps(context) {
    const countryName = context.params.countryName;

    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,population,area,capital,subregion`,
        {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        })
    const data = await response.json() as CountryDetails[] || [];
    return {
        props: {
            countryDetails: data ? data[0] : undefined
        },
        revalidate: 3600
    }
}

export const getStaticPaths = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,population,area",
        {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }});
    const data = await response.json() as Country[] || [];

    return {
        fallback: false,
        paths: data.map(country => ({ params: { countryName: country.name.common.toString()}}))
    }
}