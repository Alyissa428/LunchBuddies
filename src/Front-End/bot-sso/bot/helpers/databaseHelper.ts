const KustoClient = require("azure-kusto-data").Client;
const KustoConnectionStringBuilder = require("azure-kusto-data").KustoConnectionStringBuilder;
// const ClientRequestProperties = require("azure-kusto-data").ClientRequestProperties;
// const { v4: uuidv4 } = require("uuid");

enum Tables {
    Users = "users",
    QnA = "questionsAndAnswers",
    UsersPersonality = "usersPersonality"
}

export class DatabaseHelper {
    private _clusterConnectionString: string;
    private _applicationClientId: string;
    private _applicationKey: string;
    private _authority: string;
    kustoClient: any;
    database: string;
    
    constructor (database ? : string) {
        this._clusterConnectionString = "<service URI>";  //service URI
        this._applicationClientId = "<application client id>";
        this._applicationKey = "<application key>";
        this._authority = "<tenant ID>";                // AAD tenant ID
        
        if (database) {
            this.database = database;
        } else {
            this.database = "";
        }

        // should add validation and checking here...
        const kcs = KustoConnectionStringBuilder.withAadApplicationKeyAuthentication(
            this._clusterConnectionString,
            this._applicationClientId, 
            this._applicationKey, 
            this._authority)
            
        this.kustoClient = new KustoClient(kcs);
    }

    async queryAllQuestionsAndAnswers() {
        try {
            let response = await this.kustoClient.execute(this.database, `${Tables.QnA}`);
            let results = JSON.parse(response.primaryResults[0]).data;
            console.log(results);
            return(results);
        } catch (error) {
            console.log(error);
        }
    }

    async queryAllUsers() {
        try {
            let response = await this.kustoClient.execute(this.database, `${Tables.Users}`);
            let results = JSON.parse(response.primaryResults[0]).data;
            console.log(results);
            return(results);
        } catch (error) {
            console.log(error);
        }
    }

    async queryUserByAlias(alias : string) {
        try {
            let response = await this.kustoClient.execute(this.database, `${Tables.Users} | where alias == ${alias}`);
            let results = JSON.parse(response.primaryResults[0]).data;
            console.log(results);
            return(results);
        } catch (error) {
            console.log(error);
        }
    }

    async queryAllUsersPersonality() {
        try {
            let response = await this.kustoClient.execute(this.database, `${Tables.UsersPersonality}`);
            let results = JSON.parse(response.primaryResults[0]).data;
            console.log(results);
            return(results);
        } catch (error) {
            console.log(error);
        }
    }

    async queryUserPersonalityByAlias(alias : string) {
        try {
            let response = await this.kustoClient.execute(this.database, `${Tables.UsersPersonality} | where alias == ${alias}`);
            let results = JSON.parse(response.primaryResults[0]).data;
            console.log(results);
            return(results);
        } catch (error) {
            console.log(error);
        }
    }

}
