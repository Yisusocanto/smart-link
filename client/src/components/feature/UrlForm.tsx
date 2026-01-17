"use client";

import { useCreateLink } from "@/hooks/useLink";
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  InputGroup,
  Spinner,
  TextField,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Copy, ExternalLink, Zap } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const Schema = z.object({
  url: z.url("URL invalid."),
});

function UrlForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(Schema) });

  const {
    mutate: createLink,
    isPending,
    isError,
    error,
    data,
  } = useCreateLink();

  const onSubmit = handleSubmit((data) => {
    createLink(data.url);
  });

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <TextField isInvalid={!!errors.url} aria-label="text-field">
          <InputGroup>
            <InputGroup.Input
              type="text"
              {...register("url")}
              placeholder="https://example.com/very-long-url-to-shorten..."
            />
            <InputGroup.Suffix>
              <Button aria-label="submit" type="submit">
                {isPending ? "Shorting..." : "Shorten"}
                {isPending ? <Spinner /> : <Zap />}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>
          <FieldError>{errors.url?.message}</FieldError>
        </TextField>
      </Form>
      {isError && (
        <p className="text-danger">
          {axios.isAxiosError(error)
            ? error.response?.data.error
            : "Unknown error."}
        </p>
      )}
      {data && (
        <Card className="flex flex-row justify-between mt-5 border">
          <div className="flex flex-col">
            <a
              href={data.shortenLink}
              target="_blank"
              className="text-lg text-blue-500 hover:text-blue-400 flex gap-2 items-center"
            >
              {data.shortenLink} <ExternalLink size={18} />
            </a>
            <p className="text-muted">{data.originalURL}</p>
          </div>
          <div className="flex items-center">
            <Button>
              <Copy /> Copy
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

export default UrlForm;
