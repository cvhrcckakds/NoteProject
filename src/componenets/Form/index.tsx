import { FormEvent, useRef, useState } from "react";
import { Stack, Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { v4 as uuidv4 } from "uuid";
import { Tag } from "../../types";
import { CreatePageProps } from "../../Pages/CreatePage";

const CustomForm = ({
  availableTags,
  createTag,
  handleSubmit,
  title='',
  tags=[],
  markdown='',
}: CreatePageProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const markDownRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Note oluştur
    const newNote = {
      title: titleRef.current!.value,
      markdown: markDownRef.current!.value,
      tags: selectedTags,
    };

    handleSubmit(newNote);

    // Bir önceki sayfaya yönlendir
    navigate(-1);
  };

  return (
    <Form onSubmit={handleSend}>
      <Stack>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Başlık</Form.Label>
              <Form.Control defaultValue={title} ref={titleRef} required className="shadow" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Etiketler</Form.Label>
              <CreatableSelect
                isMulti
                isClearable
                // @ts-ignore
                onChange={(all_tags) => setSelectedTags(all_tags)}
                onCreateOption={(text) => {
                  const newTag: Tag = { label: text, value: uuidv4() };
                  createTag(newTag);
                  setSelectedTags([...selectedTags, newTag]);
                }}
                options={availableTags}
                value={selectedTags}
                className="text-black"
              />
            </Form.Group>
          </Col>
        </Row>
        {/* İçerik alanı */}
        <Form.Group className="mt-4">
          <Form.Label>İçerik</Form.Label>
          <Form.Control
          defaultValue={markdown}
            ref={markDownRef}
            as="textarea"
            className="shadow"
            style={{ minHeight: "300px", maxHeight: "500px" }}
          />
        </Form.Group>

        {/* Butonlar */}
        <Stack
          direction="horizontal"
          gap={4}
          className="justify-content-end mt-5"
        >
          <Button type="submit">Kaydet</Button>
          <Button
            onClick={() => navigate(-1)}
            type="button"
            variant="secondary"
          >
            Geri
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default CustomForm;
