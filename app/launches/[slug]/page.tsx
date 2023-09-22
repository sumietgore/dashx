import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

async function getLaunch(launch_id: string) {
    const response = await fetch(`https://api.spacexdata.com/v3/launches/${launch_id}`)
    return response.json()
}


export default async function Launch({ params }: { params: { slug: string } }) {
    // const response = await (await fetch(`https://api.spacexdata.com/v3/launches/${params.slug}`)).json()
    const response = await getLaunch(params.slug)
    return (
        <>
            <main className="py-6 container mx-auto px-6">
                <div className="py-4">
                    <Button asChild variant="ghost"><Link href="/">Back to Launches</Link></Button>
                </div>
                <div className="flex flex-col md:flex-row py-6">
                    <div className="md:w-1/3">
                        <Image className="mb-4" src={response.links.mission_patch_small} height={200} width={200} alt={response.mission_name} />
                        <h1 className="text-2xl font-bold">{response.mission_name}</h1>
                    </div>
                    <div>
                    </div>
                </div>
            </main>
        </>
    )
}