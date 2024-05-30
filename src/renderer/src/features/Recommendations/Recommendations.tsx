import {useFetcher} from "react-router-dom";
import {useEffect, useState} from "react";
import {RecommendedBook} from "./RecommendedBook/RecommendedBook";
import {IBookData} from "../../shared/constants/queryModels/book.model";
import { StyledRecommendationsList } from "./Recommendations.style";
import { ShowMoreButton } from "../../components/Buttons";

const Recommendations = () => {
  const fetcher = useFetcher();
  const [showRecommendations, setShowRecommendations] = useState<boolean>(false)

  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load(`recommendations`);
    }
  }, [fetcher]);

  return (<div>
    <ShowMoreButton currentState={showRecommendations} changeState={setShowRecommendations}></ShowMoreButton>
    {showRecommendations && fetcher.data &&
      <StyledRecommendationsList>
        {fetcher.data.recommendationsBySimilarity.map((book: IBookData) => {
          return <RecommendedBook key={book.id} {...book} />
          })
        }
        {fetcher.data.recommendationsByRating.map((book: IBookData) => {
          return <RecommendedBook key={book.id} {...book} />
        })
        }
      </StyledRecommendationsList>
    }
  </div>);
}

export { Recommendations };
