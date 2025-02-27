import app from "./app";

async function main() {
    try {
        app.listen(4000, () => {
            console.log("Blood donation server is running on port 4000");
        })
    }
    catch (error) {
        console.log(error);
    }
}

main();