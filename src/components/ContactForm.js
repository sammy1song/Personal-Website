import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast } from "@chakra-ui/react";
import emailjs from 'emailjs-com';

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add a loading state
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send('service_zai9iln', 'template_s995y9f', {name, email, message}, '3Q9UqBVwQB5VA5SuP')
      .then((response) => {
        setLoading(false); // Set loading to false upon success
        toast({
          title: "Email sent!",
          description: "Your message has been sent successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }, (err) => {
        setLoading(false); // Set loading to false upon failure
        toast({
          title: "Email not sent.",
          description: "There was an error sending your message.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
      
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <Box my={8} textAlign="left" width = "full">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} width = "full"/>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} width = "full"/>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Message</FormLabel>
          <Textarea type="text" placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)} width = "full" height = {200} />
        </FormControl>
        <Button width="full" mt={4} type="submit" isLoading={loading}>
          Submit
        </Button>
      </form>
    </Box>
  );
}
