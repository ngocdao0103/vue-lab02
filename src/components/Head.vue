<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>


<template>
    <!-- navbar bs -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <RouterLink class="fs-4 fw-bold navbar-brand router-link-active router-link-exact-active text-success"
                to="/">NhutDuy</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link active" aria-current="page" to="/"><i class="bi bi-house me-2"></i>Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/products"><i class="bi bi-view-list me-2"></i> Product</RouterLink>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false"> <i class="bi bi-list me-2"></i>
                            Categories
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><RouterLink class="dropdown-item" to="/categories">All Categories</RouterLink></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><RouterLink class="dropdown-item" to="/products?category=coffee">Coffee</RouterLink></li>
                            <li><RouterLink class="dropdown-item" to="/products?category=milktea">Milk Tea</RouterLink></li>
                            <li><RouterLink class="dropdown-item" to="/products?category=hotchocolate">Hot Chocolate</RouterLink></li>
                        </ul>
                    </li>
                    <li class="nav-item"><RouterLink class="nav-link" to="/about"><i class="bi bi-person-lines-fill me-2">
                            </i>About Us </RouterLink>
                    </li>
                    <li class="nav-item"> <RouterLink class="nav-link" to="/contact">
                        <i class="bi bi-headset me-2"></i>
                        Contact  </RouterLink>
                    </li>

                </ul>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>
</template>

