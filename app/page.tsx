import React from "react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { SuccessSelector, SortSelector } from "@/components/launchSuccess"

import LoadMore from "@/components/loadMore";

const PAGE_SIZE = 6;

type launch = {
  flight_number: number,
  mission_name: string,
  launch_date_utc: string,
  rocket: {
    rocket_id: string,
    rocket_name: string,
    rocket_type: string,
  },
  launch_site: {
    site_id: string,
    site_name: string
  },
  links: {
    mission_patch_small: string
  },
}

const getLaunches = (offset: number = 0) =>
  fetch(
    `https://api.spacexdata.com/v3/launches?limit=${PAGE_SIZE}&offset=${offset}`
    , { next: { revalidate: 600 } }).then((res) => res.json());

async function loadMoreLaunches(offset: number = 0) {
  "use server";
  const launches = await getLaunches(offset);

  const nextOffset = launches.length >= PAGE_SIZE ? offset + PAGE_SIZE : null;

  return [
    // @ts-expect-error async RSC
    <LaunchesList offset={offset} launches={launches} key={offset} />,
    nextOffset,
  ] as const;
}

const LaunchesList = async ({
  launches,
}: { launches: any }) => {
  return (
    <>
      {launches?.map((launch: launch) => (
        <Card key={launch.flight_number} className="flex flex-row">
          <div className="flex justify-center items-center px-6 bg-secondary w-1/4" >
            {launch.links.mission_patch_small && <Image src={launch.links.mission_patch_small} height="100" width="100" alt={launch.flight_number.toString()} />}
          </div>
          <div className="w-3/4">
            <CardHeader>
              <CardTitle>{launch.mission_name}</CardTitle>
              <CardDescription>{launch.rocket.rocket_name} {launch.rocket.rocket_type} | {launch.launch_date_utc}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Launch Site : {launch.launch_site.site_name}</p>
            </CardContent>
            <CardFooter>
              <Button asChild><Link href={`/launches/${launch.flight_number}`}>View</Link></Button>
            </CardFooter>
          </div>
        </Card>
      ))}
    </>
  );
};

export default async function Home() {
  const initialLaunches = await getLaunches(0)
  return (
    <>
      <header className="py-12 container mx-auto flex flex-row space-x-4">
        <SuccessSelector />
        <SortSelector />
        <Button>Filters</Button>
      </header>
      <main className="pb-12 container mx-auto">
        <LoadMore loadMoreAction={loadMoreLaunches} initialOffset={PAGE_SIZE}>
          <LaunchesList launches={initialLaunches} />
        </LoadMore>
      </main>
    </>
  )
}
