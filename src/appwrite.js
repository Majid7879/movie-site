import { Client, Databases, Query, ID } from 'appwrite';

const PROJECT_ID = '68306eac0028a026f578'
const DATABASE_ID = '68306ed1003e20131ad5'
const COLLECTION_ID = '68306f0f000cc34e709b'

const client = new Client();
client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const databases = new Databases(client);


export const getQueryCount = async (query = '') => {

    try {
        let result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('query', query)
        ]);
        return result.documents[0] ? result.documents[0].count : 0;
    } catch (error) {
        console.log(`Error: (${error.type} : ${error.code}) \n\t${error.message}`)
        return 0;
    }
}
export const getQueryID = async (query = '') => {

    try {
        let result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('query', query)
        ]);
        return result.documents[0] ? result.documents[0]['$id'] : null;
    } catch (error) {
        console.log(`Error: (${error.type} : ${error.code}) \n\t${error.message}`)
        return null;
    }
}

export const createQueryCount = async (query = '', count = 1) => {

    try {
        let result = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            {
                query: query,
                count: count
            }
        )

        return true;
    } catch (error) {
        console.log(`Error: (${error.type} : ${error.code}) \n\t${error.message}`)
        return false;
    }
}

export const updateQueryCount = async (query = '', count = 1) => {

    try {
        let id = await getQueryID(query);

        if (!id) {
            throw { "message": "Query could not be found.", "code": 404, "type": "document_not_found", "version": "1.6.2" }
        }

        let result = await databases.updateDocument(
            DATABASE_ID, COLLECTION_ID,
            id,
            { count: count })

        return true;
    } catch (error) {

        console.log(`Error: (${error.type} : ${error.code}) \n\t${error.message}`)

        return false;
    }
}

