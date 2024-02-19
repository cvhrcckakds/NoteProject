import {
  Button,
  Col,
  Form,
  Row,
  Stack,
} from "react-bootstrap";
import { Note, Tag } from "../../types";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import ReactSelect from "react-select";
import Card from "../../componenets/Card";

type MainPageProps = {
  notes: Note[];
  availableTags: Tag[];
};

const MainPage = ({ availableTags, notes }: MainPageProps) => {
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const filtredNotes = useMemo(
    () =>
      notes.filter((note) => {
        return (
          //noteun başlığı aratılan metni içeriyorsa notu döndür
          (title === "" || //title yoksa
            note.title.toLowerCase().includes(title.toLowerCase())) &&
          //seçtiğim etiketin tamamı notta varsa notu döndür
          (selectedTags.length === 0 || //etiket seçilmediyse filtreleme yapma
            selectedTags.every((s_tag) => //yazılan hepsin
              note.tags.some((noteTag) => noteTag.value === s_tag.value)
            ))
        );
      }),
    [title, selectedTags, notes]
  );

  return (
    <div className="container py-5">
      {/* Üst ksım */}
      <Stack direction="horizontal" className="justify-content-between">
        <h1>Notlar</h1>
        <Link to="/new">
          <Button>Oluştur</Button>
        </Link>
      </Stack>

      {/* filtreleme */}
      <Form className="mt-4">
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Başlığa Göre Ara</Form.Label>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                className="shadow"
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Etikete Göre Ara</Form.Label>
              <ReactSelect
                // @ts-ignore
                onChange={(all_tags) => setSelectedTags(all_tags)}
                //daha önce oluşturduğumuz etiketleri listele
                options={availableTags}
                isMulti
                className="text-black"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {/* not listesi */}
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3 mt-4">
        {filtredNotes.map((note) => (
          <Col>
            <Card key={note.id} note={note} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MainPage;
