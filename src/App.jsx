import s from "./style.module.css"
import {TVShowAPI} from "./api/tv-show";
import {useEffect, useState} from "react";
import {BACKDROP_BASE_URL} from "./config";
import {TVShowDetail} from "./components/TVShowDetail/TVShowDetail";
import {Logo} from "./components/Logo/Logo";
import logoImg from './assets/images/logo.png';
import {TVShowListItem} from "./components/TVShowListItem/TVShowListItem";
import {TVShowList} from "./components/TVShowList/TVShowList";
import {SearchBar} from "./components/SearchBar/SearchBar";

export function App(){

    const [currentTVShow, setCurrentTVShow] = useState();
    const [recommendationList, setRecommendationList] = useState([]);

    async function fetchPopular() {
        try {
            const popTVShowList = await TVShowAPI.fetchPopular();
            if (popTVShowList.length > 0) {
                setCurrentTVShow(popTVShowList[0]);
            }
        }catch (error) {
            console.log("There was an error fetching popular: " + error);
            alert("There was an error fetching popular tv show");
        }
    };

    async function fetchRecommendations(tvShowID) {
        try {
            const recommendationListResp = await TVShowAPI.fetchRecommendations(tvShowID);
            if (recommendationListResp.length > 0) {
                setRecommendationList(recommendationListResp.slice(0, 10));
            }
        }catch (e) {
            console.log("There was an error retrieving recommendations: " + e);
            alert("There was an error fetching recommendations");
        }
    };

    async function fetchByTitle(title) {
        try {
            const searchResponse = await TVShowAPI.fetchByTitle(title);
            if (searchResponse.length > 0) {
                setCurrentTVShow(searchResponse[0])
            }
        }catch (e) {
            console.log("There was an error fetching that title: " + e);
            alert("There was an error fetching that title");
        }
    };

    useEffect(()=> {
        fetchPopular();

    }, []);

    useEffect(()=> {
        if(currentTVShow){
            fetchRecommendations(currentTVShow.id);
        }
    }, [currentTVShow]);

    function updateCurrentTVShow(tvShow){
        setCurrentTVShow(tvShow);
    }

    console.log(currentTVShow);
    console.log(recommendationList);
    return (
        <div className={s.main_container} style={{
            background: currentTVShow
                ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
             url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
                : "black",
        }}>
            <div className={s.header}>
                <div className={'row'}>
                    <div className={'col-4'}>
                        <Logo image={logoImg} title={'What To Watch'} subtitle={'TV Show Recommendation Engine'} />
                    </div>
                    <div className={'col-md-12 col-lg-4'}>
                        <SearchBar onSubmit={fetchByTitle}/>
                    </div>
                </div>
            </div>
            <div className={s.tv_show_detail}>
                {currentTVShow && <TVShowDetail tvShow={currentTVShow}/>}
            </div>
            <div className={s.recommended_tv_shows}>
                {currentTVShow && <TVShowList onClickItem={updateCurrentTVShow} tvShowList={recommendationList} />}
            </div>
        </div>
    );
}