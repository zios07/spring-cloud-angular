package ma.fgs.product.publisher;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;

import ma.fgs.product.proxy.AttachmentProxy;

@Component
public class AttachmentPublisher {

	private static final Logger LOGGER = LoggerFactory.getLogger(AttachmentPublisher.class);	
	private MessagePublisher publisher;

	public AttachmentPublisher(MessagePublisher publisher) {
		this.publisher = publisher;
	}

	public void send(List<AttachmentProxy> attachments) {
		LOGGER.info("Sending {} attachments to the broker", attachments.size());
		boolean sent = publisher.publishAttachment().send(MessageBuilder.withPayload(attachments).build());
		if(sent) {
			LOGGER.info("Successfully sent attachments to broker");
		} else {
			LOGGER.info("Could not send attachments to the broker");
		}
	}

}
