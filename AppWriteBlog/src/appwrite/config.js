import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Create a new Document. 
    async createPost({title, slug, content, featuredImage, status, userid}){
        // console.log(userid);
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,    // documentId
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userid, 
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    // Update a document by its unique ID. Using the patch method you can pass only specific fields that will get updated.
    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
            
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error)
        }
    }

    // Delete a document by its unique ID.
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error)
            return false
        }
    }

    // Get a document by its unique ID. This endpoint response returns a JSON object with the document data.
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error)
            return false
        }
    }

    // Get a list of all the user's documents in a given collection. You can use the query params to filter your results.
    async getPosts(userid, queries = [Query.equal("status", "active")]){
        try {
            queries.push(Query.equal("userid", userid)); // Dynamically add userId query
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error)
            return false
        }
    }

    //file upload service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error)
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId,
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error)
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appWriteBucketId,
            fileId
        )
    }

}

const service = new Service();

export default service

