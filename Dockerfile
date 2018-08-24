FROM php:7.2.9-cli-alpine3.8

COPY . /usr/src/app
WORKDIR /usr/src/app

# @link https://stackoverflow.com/questions/44097266/add-yaml-extension-to-php-on-using-official-alpine-docker-image
ENV PHPIZE_DEPS \
    git \
    file \
    re2c \
    autoconf \
    make \
    zlib \
    zlib-dev \
    g++ \
    yaml-dev

ENV PHP_DEPS \
    php7@community \
    php7-dev@community \
    php7-bcmath@community \
    # but you can avoid pecl installation by this method
    php7-xdebug@community

RUN set -xe; \
    apk add --update --no-cache --virtual .build-deps ${PHPIZE_DEPS}; \
    echo '@community http://nl.alpinelinux.org/alpine/v3.7/community/' >> /etc/apk/repositories; \
    apk --update add --no-cache ${PHP_DEPS};

RUN pecl install yaml && \
    docker-php-ext-enable yaml

CMD [ "php", "./swagger-yaml-to-html.php" ]