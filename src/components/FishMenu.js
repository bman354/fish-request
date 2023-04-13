import React from "react";
import { useState, useEffect } from "react";

export default function FishMenu() {
/*
Two useState hooks, one to hold the data retrieved from the API, one to hold a string of the name of fish we are fetching, 
one useEffect to ensure we do not repeatedly re-render and therefore re-request in an infinite loop
*/
    const [currentFish, setCurrentFish] = useState(() => "Tarpon")
    const [apiData, setApiData] = useState(() => [])

    useEffect(() => {
        getFishData()
    }, [currentFish]);
    

    //fetch the data on the local host based on the type of fish you are requesting, data and errors are sent to API data hook
    const getFishData = async () => {
        fetch(`http://localhost:8080/species?fetch_species=${currentFish}`)
        .then(res => res.json())
        .then(data => setApiData(data))
        .catch(error => {
            console.log(error);
            setApiData(error);
        })
    }
    /*
    JSX to make a selection menu that changes the fish we request based on the value of the option, cascades to a fetch call to update data
    maps returned fish object and bait objects to display data in <ul> tags
    */
    return (
        <>
            <div id="fishSelectMenu">
                <select onChange={(e) => {setCurrentFish(e.target.value)}}>
                    <option value="Tarpon">Tarpon</option>
                    <option value="Snook">Snook</option>
                    <option value="Redfish">Redfish</option>
                    <option value="Snapper">Snapper</option>
                    <option value="Spotted Seatrout">Spotted Seatrout</option>
                    <option value="Sheepshead">Sheepshead</option>
                    <option value="Spanish Mackeral">Spanish Mackeral</option>
                </select>
            </div>

        {apiData.map((fish, index) => (
            <div key={index}>
            <h3>{fish.species_id}<br /></h3>

                <h4> Rod </h4>
                    <div id="rod">
                        {fish.rod.rod_id}<br />
                        {fish.rod.rodAction}<br />
                        {fish.rod.rodTipAction}<br />
                        {fish.rod.rodLengthInch}<br />
                    </div>


                <h4> Reel </h4>
                    <div id="reel">
                        {fish.reel.reel_name}<br />
                        {fish.reel.reel_power}<br />
                        {fish.reel.lineType}<br />
                        {fish.reel.lineWeight}<br />
                    </div>



                pro tip: 
                {fish.pro_tip}<br />

                <h4>Primary Habitat</h4>
                {fish.habitat.toLowerCase()}<br />

                <h4>Recommended Baits: </h4>
                <ul id="baits">
                {fish.baits.map((bait, i) => {
                    return(
                    <div key={i}>
                        {bait.bait_id}<br />
                        {bait.isNatural}<br />
                    </div>
                )})}
                </ul>
            </div>
        ))}
        </>
    );
}