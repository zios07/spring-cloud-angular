package ma.fgs.product.configuration;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableRabbit
public class RabbitConfiguration {

	@Value("${queue.attachment.name}")
	private String attachmentQueue;

	@Bean
	public Queue queue() {
		return new Queue(attachmentQueue, true);
	}

}
