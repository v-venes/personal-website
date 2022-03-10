<script lang="ts">
  import { Container, Row, Col, Image, Icon, Button } from "sveltestrap";

  const src = "images/programmer.svg";
</script>

<Container>
  <Row class="content-row">
    <Col md={6} class="mb-4">
      <p class="home-title">Hello World 👋 I'm Victor Neves!</p>
      <p class="home-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed metus
        elementum urna laoreet congue. Cras tempus maximus velit vitae ornare.
        Nam ultrices mi et lorem rhoncus venenatis. Orci varius.
      </p>
      <div class="icons" />
      <div class="buttons">
        <Button
          href="https://github.com/BikutaDesu"
          target="_blank"
          class="social-media-btn github-btn"
        >
          <Icon name="github" />
        </Button>
        <Button
          href="https://www.linkedin.com/in/victor-neves99/"
          target="_blank"
          class="social-media-btn linkedin-btn"
        >
          <Icon name="linkedin" />
        </Button>
        <Button
          href="https://twitter.com/99_venes"
          target="_blank"
          class="social-media-btn twitter-btn"
        >
          <Icon name="twitter" />
        </Button>
      </div>
    </Col>
    <Col md={6}>
      <Image fluid alt="" {src} />
    </Col>
  </Row>
</Container>

<style>
  :global(.content-row) {
    display: flex;
    flex-direction: row;
    align-items: center;

    margin-top: 48px;
  }

  :global(.social-media-btn) {
    border-radius: 48px;
    font-size: 32px;
    margin-right: 16px;
    padding: 10px 18px 10px 18px;
  }

  :global(.github-btn) {
    background-color: rgba(58, 58, 58, 255);
    border-color: rgba(58, 58, 58, 255);
  }

  :global(.linkedin-btn) {
    background-color: rgba(15, 119, 168, 255);
    border-color: rgba(15, 119, 168, 255);
  }

  :global(.twitter-btn) {
    background-color: rgba(26, 161, 242, 255);
    border-color: rgba(26, 161, 242, 255);
  }

  .buttons {
    display: flex;
    align-items: center;
  }

  .home-title {
    font-size: 3.5em;
    font-weight: 700;
  }

  .home-description {
    font-size: 1.4em;
    color: gray;
  }
</style>
