class RecommendationList {

  static collectionId = "recommendation";
  static documentId = "recommendationList";
  static storageKey = "recommendationList";


  constructor(title,url,type,id) {
    this._title = title;
    this._url = url;
    this._type = type;
    this._id = id;

  }

  static getRecommendation(){
  
    let recommendationList = storage_get("recommendationList");
    let objectRecommendationList = Object.keys(recommendationList);
    var recommendationID = objectRecommendationList[Math.floor(Math.random() * objectRecommendationList.length)];
    var recommendation = recommendationList[recommendationID];

    return {id: recommendationID, title:  recommendation.title, url: recommendation.URL};

  }


  static async downloadRecommendations() {
     readFrombDb(this.collectionId, this.documentId, callback);

     function callback(data) {
      storage_set("recommendationList", data);
    }

  return 0;
  }

}