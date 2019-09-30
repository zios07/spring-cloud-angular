package ma.fgs.product.rest.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import ma.fgs.product.publisher.AttachmentPublisher;

@RestController("rabbitdemo")
public class RabbitDemo {

	private AttachmentPublisher attachmentPublisher;

	public RabbitDemo(AttachmentPublisher publisher) {
		this.attachmentPublisher = publisher;
	}

	@GetMapping("{message}")
	public void sendMessage(@PathVariable String message) {
		this.attachmentPublisher.send(message);
	}

}
