 var htmlMatchInfo = "";
         var htmlTitle = "";
         let promise = new Promise(function(resolve,reject){
               if(true){
                   resolve('\"from resolve inner function\"');
               }else{
                   reject('\"error message in reject\"');
               }
            });
          promise.then(function(value){
                fetch('crick.json')
                .then((response) => {return response.json()})
                .then((data)=>{
                    let matchType = data['typeMatches'];
                    matchType.map((cval,index)=>{
                          document.getElementById('match_types').innerHTML += `<p id='${cval.matchType}' onclick='getMatchId(this)' class="leagues">${cval.matchType}</p>`; 
                          seriesMatches = cval.seriesMatches; 
                          console.log(seriesMatches);
                          seriesMatches.map((cval,key)=>{
                              if(cval.seriesAdWrapper){
                                s_name = cval.seriesAdWrapper.seriesName;
                             if(s_name.includes('India')){
                                seriesName = cval.seriesAdWrapper.seriesName;
                                htmlTitle += `<p class="match-title">${cval.seriesAdWrapper.seriesName}</p>`;
                                searchSeries = cval.seriesAdWrapper.matches;
                                searchSeries.map((cval,key)=>{
                                    var matchDate = new Date(parseInt(cval.matchInfo.startDate));
                                    htmlMatchInfo += `<div class="score_wrapper">
                                    <div class="wrapper_inner">
                                    <p>${cval.matchInfo.seriesName} -- ${cval.matchInfo.matchDesc}</p>
                                    <p>${matchDate}</p>
                                    <p><span>Result : ${cval.matchInfo.stateTitle}</span></p>   
                                    <button id="${cval.matchInfo.matchId}" onclick="getFullScore(this)" data-bs-toggle="modal" data-bs-target="#myModal" onclick="getFullScore(this)">Score</button></div></div>`;
                                  })
                                }  
                              }
                            })
                        });
                    document.getElementById('match_search_details').innerHTML = htmlMatchInfo;    
                })
          },function(err){
                console.log('value in reject:',err); 
          })
        function searchMatches(value){
            var inpVal = document.getElementById("search_input").value ;
            var newStr = inpVal.split('');
            var f_Char = newStr[0].toUpperCase();
            newStr[0]
            newStrArr = [];
            newStrArr.push(f_Char); 
            for(x in newStr){
               if(x!=0){
                 newStrArr.push(newStr[x])
               } 
            }
            inpVal =  newStrArr.join('');

            if(inpVal.length>1){
                var htmlTitle = "";
            var htmlMatchInfo = "";
            result = inpVal.trim();
            console.log('this result',result);
            fetch('crick.json')
            .then((response)=>{
                return response.json();
            })    
            .then((data)=>{
                data.typeMatches.forEach(element => {
                     var matchArray = element.seriesMatches;
                     matchArray.map((cval,key)=>{
                         if(cval.seriesAdWrapper){
                             s_name = cval.seriesAdWrapper.seriesName;
                             if(s_name.includes(result)){
                                seriesName = cval.seriesAdWrapper.seriesName;
                                htmlTitle += `<p class="match-title">${cval.seriesAdWrapper.seriesName}</p>`;
                                searchSeries = cval.seriesAdWrapper.matches;
                                searchSeries.map((cval,key)=>{
                                    var matchDate = new Date(parseInt(cval.matchInfo.startDate));
                                    htmlMatchInfo += `<div class="score_wrapper">
                                    <div class="wrapper_inner">
                                    <p>${cval.matchInfo.seriesName} -- ${cval.matchInfo.matchDesc}</p>
                                    <p>${matchDate}</p>
                                    <p><span>Result : ${cval.matchInfo.stateTitle}</span></p>   
                                    <button id="${cval.matchInfo.matchId}" onclick="getFullScore(this)" data-bs-toggle="modal" data-bs-target="#myModal" onclick="getFullScore(this)">Score</button></div></div>`;
                               })
                             }
                            
                         }
                         console.log(htmlMatchInfo);
                         if(htmlMatchInfo.length>0){
                            document.getElementById('match_search_details').innerHTML = htmlMatchInfo;
                         }else{
                              console.log('im in else');  
                              document.getElementById('match_search_details').innerHTML = `<div class="no-data">
                               <p>Sorry no data found, please search again..!</p><div class="no-data-img"><img src="images/sad-face.png"/></div></div>`;             
                            }
                         
                     })
                 });
                
              })
            }else{
                alert('Please enter something');
            }
            
         }
         function getFullScore(matchId){
             var htmlScore=""; 
             fetch('crick.json')
             .then((response)=>{
                 return response.json();
             })
             .then((data)=>{
                 //console.log(data.typeMatches);
                 data.typeMatches.map((cval,index)=>{
                      cval.seriesMatches.map((cval,index)=>{
                          if(cval.seriesAdWrapper){
                              cval.seriesAdWrapper.matches.map((cval,index)=>{
                                  if(cval.matchInfo.matchId==matchId.id){
                                  //   console.log(cval.matchInfo.team1.teamName);  
                                   htmlScore = `<div class="score-total">
                                         <p class="match_result">${cval.matchInfo.status}</p>
                                         <div class="Team Details"><p><span>Team1</span> : ${cval.matchInfo.team1.teamName}</p><p><span>Team2</span> : ${cval.matchInfo.team2.teamName}</p></div> 
                                         <div class="score_wrapper_modal">
                                         <div class="wrapper-inner">
                                         <p class="team-title">Team-1</p>
                                         <p>Runs : ${cval.matchScore.team1Score.inngs1.runs}</p>
                                         <p>Wickets : ${cval.matchScore.team1Score.inngs1.wickets}</p>
                                         <p>Overs : ${cval.matchScore.team1Score.inngs1.overs}</p></div>
                                         <div class="wrapper-inner">
                                         <p class="team-title">Team-2</p>
                                         <p>Runs : ${cval.matchScore.team2Score.inngs1.runs}</p>
                                         <p>Wickets : ${cval.matchScore.team2Score.inngs1.wickets}</p>
                                         <p>Overs : ${cval.matchScore.team2Score.inngs1.overs}</p></div></div>  
                                     </div>` ;   
                                }
                              })
                          }
                      })
                     
                 })
                document.getElementById('fullscore').innerHTML=htmlScore; 
             })
         } 
         function getMatchId(obj){
          obj.classList.add('active-cat');
          console.log('node this',obj);
          var classNodes = document.getElementsByClassName('active-cat');
           for(var i = 0;i<classNodes.length ;i++){
             if(obj!=classNodes[i]){
               classNodes[i].className = classNodes[i].className.replace("active-cat"," ");  
              }  
            }
            var seriesValues ='';    
            document.getElementById('values').innerHTML = "";
                document.getElementById('match-title').innerHTML = ""; 
                fetch('crick.json')
                .then((response) => {return response.json()})
                .then((data)=>{
                    let matchType = data['typeMatches'];
                    matchType.map((cval,index)=>{
                          if(obj.id==cval.matchType){
                            let matchDetails = cval.seriesMatches;
                             matchDetails.map((cval,index)=>{
                             if(index!=1){
                                let seriesName = cval.seriesAdWrapper;
                                let seriesId = cval.seriesAdWrapper.seriesId;
                                 cval.seriesAdWrapper.matches.map((cval,index)=>{
                                  var matchDate = new Date(parseInt(cval.matchInfo.startDate)); 
                                  seriesValues += 
                                   `<div class="score_wrapper">
                                    <div class="wrapper_inner">
                                    <p>${cval.matchInfo.seriesName} -- ${cval.matchInfo.matchDesc}</p>
                                    <p>${matchDate}</p>
                                    <p><span>Result : ${cval.matchInfo.stateTitle}</span></p>   
                                    <button id="${cval.matchInfo.matchId}" onclick="getFullScore(this)" data-bs-toggle="modal" data-bs-target="#myModal" onclick="getFullScore(this)">Score</button></div></div>`;
                                 })   
                               }
                            })
                         } 
                        document.getElementById('match_search_details').innerHTML = seriesValues; 
                     })
                  })
               }
        function getDetails(value){
           let seriesID = value.id;
           let htmlEntity="";
           fetch('crick.json')
           .then((response)=>{
               return response.json();
           })
           .then((data)=>{
               matchData = data.typeMatches;
               matchData.map((cval,index)=>{
                  cval.seriesMatches.map((cval,index)=>{
                      if(index!=1){
                        if(cval.seriesAdWrapper.seriesId == seriesID){
                           // console.log('matchInfo',cval.seriesAdWrapper.seriesName);
                            seriesNAME = cval.seriesAdWrapper.seriesName;
                            let matches = cval.seriesAdWrapper.matches;
                            matches.map((cval,index)=>{
                                date = cval.matchInfo.seriesEndDt;
                                var myDate = new Date(1000*date);
                                var dt = new Date(parseInt(date, 10) * 1000);
                               // console.log('date-1',myDate.toGMTString());
                               // console.log('date-2',myDate.toLocaleString());
                               // console.log('date-3',myDate.toUTCString());
                               // console.log(dt.toLocaleString());
                                htmlEntity +=     
                                `<section class='parent'>
                                 <div class="titles">
                                    <p>Format</p><p>Match Type / Day</p>
                                    <p>Status</p><p>Teams</p><p>Scores</p></div> 
                                      
                                 <div class="details"><p class="format">${cval.matchInfo.matchFormat}</p>
                                    <p class="match_type">${cval.matchInfo.matchDesc}</p>   
                                 <p class="status">${cval.matchInfo.status}</p>
                                 <p class="teams">
                                   <span>Team1 : ${cval.matchInfo.team1.teamName}</span>
                                   <span>Team2 : ${cval.matchInfo.team2.teamName}</span> 
                                </p>
                                <p class="runs">
                                     <span>Team1 Score : ${cval.matchScore.team1Score.inngs1.runs}/${cval.matchScore.team1Score.inngs1.wickets}</span>
                                     <span>Team2 Score : ${cval.matchScore.team2Score.inngs1.runs}/${cval.matchScore.team2Score.inngs1.wickets}</span>
                                 </p></div></section>` ;
                            })
                            document.getElementById('match-title').innerHTML=seriesNAME;
                            document.getElementById('values').innerHTML=htmlEntity;
                        }
                      }
                  }) 
               })
           })
       }