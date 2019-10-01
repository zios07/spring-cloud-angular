package ma.fgs.product.publisher;

import org.springframework.cloud.stream.annotation.Output;
import org.springframework.messaging.MessageChannel;

public interface MessagePublisher {

	@Output("AttachmentBinding")
	public MessageChannel publishAttachment();

}