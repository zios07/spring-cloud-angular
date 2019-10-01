package ma.fgs.product.publisher;

import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;

@Component
public class AttachmentPublisher {

	private MessagePublisher publisher;

	public AttachmentPublisher(MessagePublisher publisher) {
		this.publisher = publisher;
	}

	public void send(String message) {
		publisher.publishAttachment().send(MessageBuilder.withPayload(message).build());
	}

}
