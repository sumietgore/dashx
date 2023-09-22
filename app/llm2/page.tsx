export default async function Test() {
    const response = await (await fetch(`https://lldev.thespacedevs.com/2.2.0/launch/?limit=5&lsp__name=SpaceX&offset=0`)).json()
    console.log(response)
    return (
        <>
            <div>asd</div>
        </>
    )
}