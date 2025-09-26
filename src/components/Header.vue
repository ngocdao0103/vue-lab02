<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container-fluid">
            <RouterLink class="navbar-brand fw-bold text-success fs-4" to="/">DAO-HERE</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link active" aria-current="page" to="/"><i
                                class="bi bi-house-door me-2"></i>Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/product"><i class="bi bi-view-list me-2"></i>Product</RouterLink>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-list me-2"></i>
                            Categories
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Coffee</a></li>
                            <li><a class="dropdown-item" href="#">Tea Milk</a></li>
                            <li><a class="dropdown-item" href="#">Hot Chocolate</a></li>
                            <li><a class="dropdown-item" href="#">Sparkling Wine</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/about"><i class="bi bi-person-lines-fill me-2"></i>About Us
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/contact"><i class="bi bi-headset me-2"></i>Contact
                        </RouterLink>
                    </li>
                </ul>

                <div class="d-flex align-items-center ms-2">
                    <div class="dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="avatarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://i.pinimg.com/736x/d5/08/e9/d508e91633e342579ac8c486c31d0bf0.jpg"
                                width="35" alt="Avatar" class="rounded-circle">
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="avatarDropdown">
                            <li><a class="dropdown-item" href="#"><i class="bi bi-person me-2"></i>Profile</a></li>
                            <li><a class="dropdown-item" href="#"> <i class="bi bi-gear me-2"></i>Setting</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>