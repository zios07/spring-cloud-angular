package ma.fgs.product.rest.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ma.fgs.product.publisher.AttachmentPublisher;

@RestController("public/rabbitdemo")
public class RabbitDemo {

	private AttachmentPublisher attachmentPublisher;

	public RabbitDemo(AttachmentPublisher publisher) {
		this.attachmentPublisher = publisher;
	}

	@GetMapping
	public void sendMessage(@RequestParam String message) {
		this.attachmentPublisher.send(message);
	}

}
