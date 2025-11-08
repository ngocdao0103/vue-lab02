<template>
        <div   id="carouselExampleIndicators" class="carousel slide">
                <div class="carousel-indicators" ><button type="button"
                                data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class=""
                                aria-label="Slide 1" ></button><button type="button"
                                data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"
                                 class=""></button><button type="button"
                                data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"
                                 class="active" aria-current="true"></button></div>
                <div class="carousel-inner" >
                        <div class="carousel-item box-banner" ><img
                                        src="https://i.pinimg.com/1200x/f4/b4/68/f4b468c720a97521602be6095de1abec.jpg"
                                        class="d-block img-fit-contain w-100" alt="..." ></div>
                        <div class="carousel-item box-banner" ><img
                                        src="https://i.pinimg.com/736x/ed/ac/20/edac20a52abfab5add086cbd2a9defb9.jpg"
                                        class="d-block img-fit-contain w-100" alt="..." ></div>
                        <div class="carousel-item box-banner active" ><img
                                        src="https://i.pinimg.com/736x/ec/b4/14/ecb41449333d531f3d6f9bba33c73f04.jpg"
                                        class="d-block img-fit-contain w-100" alt="..." ></div>
                </div><button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev" ><span class="carousel-control-prev-icon"
                                aria-hidden="true" ></span><span class="visually-hidden"
                                >Previous</span></button><button class="carousel-control-next"
                        type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next"
                        ><span class="carousel-control-next-icon" aria-hidden="true"
                                ></span><span class="visually-hidden"
                                >Next</span></button>
        </div>

</template>
<style scoped>
.carousel {
        position: relative;
}

.carousel-indicators {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2;
        display: flex;
        justify-content: center;
        padding: 0;
        margin-right: 15%;
        margin-bottom: 1rem;
        margin-left: 15%;
}

.carousel-inner {
        position: relative;
        width: 100%;
        overflow: hidden;
}

.box-banner {
        height: 600px;
        overflow: hidden;
}
</style>