import React, { useState } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
import { GET_IMAGES } from "../utils/queries";
import { useQuery } from "@apollo/client";
import ReactPaginate from "react-paginate";

const SearchNasa = () => {
  // create state for holding returned Nasa api data
  const [searchedImages, setSearchedImages] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");
  const [pageCount, setPageCount] = useState(10);
  const [currentPage, setcurrentPage] = useState(0);
  const { loading, error, refetch } = useQuery(GET_IMAGES, {
    variables: { q: searchInput, from: 1 },
  });

  // create method to search for images and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      await handleFetch(1);
    } catch (err) {
      console.error(err);
    }
  };
  const handleFetch = async (page) => {
    try {
      const res = await refetch({ q: searchInput, from: page });
      if (loading) return null;
      if (error) throw new Error(`something went wrong! Error! ${error}`);

      setSearchedImages(res.data.items);
      setPageCount(searchedImages.length);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };
  const handlePageChange = (selectedObject) => {
    setcurrentPage(selectedObject.selected);
    setcurrentPage(selectedObject.selected);
    handleFetch(currentPage);
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search Images!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedImages.length
            ? `Viewing ${searchedImages.length} results:`
            : "Search for a Image to begin"}
        </h2>
        <CardColumns>
          {searchedImages.map((item,key) => {
            return (
              <Card key={key} border="dark">
                {item?.links[0]?.href ? (
                  <Card.Img
                    src={item.links[0].href}
                    alt={`${item?.href}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{item?.data[0]?.title}</Card.Title>
                  <Card.Text>{item?.data[0]?.description}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
        {loading ? (
          <ReactPaginate
            pageCount={pageCount}
            pageRange={searchedImages.length}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName={"pagecontainer"}
            previousLinkClassName={"pagelink"}
            breakClassName={"pagelink"}
            nextLinkClassName={"pagelink"}
            pageClassName={"pagelink"}
            disabledClassNae={"disabled"}
            activeClassName={"active"}
          />
        ) : (
          <div>All Data</div>
        )}
      </Container>
    </>
  );
};

export default SearchNasa;
