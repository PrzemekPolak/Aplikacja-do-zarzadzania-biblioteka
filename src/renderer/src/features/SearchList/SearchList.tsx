import { ChangeEvent, useRef, useState } from "react";
import { useFetcher, useLocation } from "react-router-dom";
import { LOAD_LINK_VARIANTS } from "../../shared/constants/loadLinkVariants";
import { TemplatedList } from "../TemplatedList";
import {
  StyledContainer,
  StyledPagination,
  StyledPaginationContainer,
  StyledGoToPage,
} from "./SearchList.style";
import { CONFIG } from "../../shared/constants/config";
import { SearchSort } from "../SearchSort";
import { ISearchListProps } from "./SearchList.model";
import { useEffectNoInitial } from "../../shared/hooks/useEffectNoInitial";

const SearchList = ({ onElementClick, variant }: ISearchListProps) => {
  const [searchSortValues, setSearchSortValues] = useState<any>(null);
  const [page, setPage] = useState<number>(1);
  const scrollRef = useRef<HTMLInputElement>(null);
  const fetcher = useFetcher();
  const curPath = useLocation().pathname.split("/");
  const idInPath = curPath[1].match(/detail/i) ? `${curPath[2]}/` : "";

  useEffectNoInitial(() => {
    if (fetcher.state === "idle") {
      if (searchSortValues !== null) {
        fetcher.submit(
          { page: 1, ...searchSortValues },
          { method: "post", action: LOAD_LINK_VARIANTS[variant] + idInPath }
        );
        setPage(1);
      }
    }
  }, [searchSortValues]);

  useEffectNoInitial(() => {
    scrollRef.current?.scrollIntoView(); // for lists in modal
    window.scroll({ top: 0, left: 0 });

    if (fetcher.state === "idle") {
      fetcher.submit(
        { page: page, ...searchSortValues },
        { method: "post", action: LOAD_LINK_VARIANTS[variant] + idInPath }
      );
    }
  }, [page]);

  return (
    <StyledContainer ref={scrollRef}>
      <SearchSort setSearchSortValues={setSearchSortValues} variant={variant} />
      <TemplatedList
        listData={fetcher.data?.listData}
        variant={variant}
        onElementClick={onElementClick}
      />
      {fetcher.state !== "loading" && fetcher.data?.listData?.length > 0 && (
        <StyledPaginationContainer>
          <StyledPagination
            count={Math.ceil(fetcher.data?.fullLength / CONFIG.PAGINATION)}
            page={page}
            variant="outlined"
            size="large"
            // @ts-ignore
            onChange={(event: ChangeEvent<unknown>, value: number) => {
              setPage(value);
            }}
          />
          <StyledGoToPage
            label="Podaj stronę"
            type="number"
            size="small"
            onKeyDown={(e: any) => {
              if (e.keyCode == 13) {
                const newPage = Number(e.target.value);
                if (
                  newPage > 0 &&
                  newPage <=
                    Math.ceil(fetcher.data?.fullLength / CONFIG.PAGINATION)
                )
                  setPage(newPage);
              }
            }}
          />
        </StyledPaginationContainer>
      )}
    </StyledContainer>
  );
};

export { SearchList };
