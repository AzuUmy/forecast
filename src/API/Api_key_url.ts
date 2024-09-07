export class ApiInfo {
  /* API key - hardcoded for easier implementation. In a traditional development environment, API keys
   are stored in environment files, and then the environment variables are used to assign the keys and
   sensitive information in general. However, for the purpose of this application, the API key is 
   hardcoded as it is public in the Git repository. */
    private readonly apiKey = "6f324290ec6be1796ba64faf5c959ebb"; // hardcoded API key - readonly so the values are not modifed 
    public readonly apiUrl = "https://api.openweathermap.org/data/2.5/weather"; // Api endpoint url -- thi ispublic doe to not be a sensitive info
    public readonly lang = "pt_br"// The API offers a variety of languages; this can be changed to the desired language
    // Public method to retrive the api key
    getKey(): string {
        return this.apiKey;
    }

}