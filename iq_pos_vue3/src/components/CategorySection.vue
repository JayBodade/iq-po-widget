<template>
    <div>
        <h2>All Categories</h2>
       
        <div v-if="categoryLoading">

            <div v-for="i in 9" :key="i" class="card small-card mt-2 skeleton-card">
                <div class="row align-center no-gutters">
                    <div class="col image-col d-flex justify-center">
                        <div class="skeleton skeleton-img rounded-circle"></div>
                    </div>
                    <div class="col text-col">
                        <div class="skeleton skeleton-text ml-2"></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
         
            <CategoryCard v-for="(category) in categories" :category="category" :key="category.ID" />
        </div>
    </div>
</template>

<script>
// import { ZOHO } from '@/lib/ZOHO-SDK';
import CategoryCard from '../components/CategoryCard.vue';
import { mapState, mapActions } from 'pinia';
import { useCounterStore } from '@/store';
export default {

    data() {
        return {
            // categories: [],
            tab: null,
        }
    },
    components: {
        CategoryCard
    },
    methods: {
        ...mapActions(useCounterStore, ['getAllCategories'])
    },
    created() {
        this.getAllCategories();
    },
    computed: {
        ...mapState(useCounterStore, ['categoryLoading','categories']),
    }

}
</script>

<style>
body {
    font-family: Arial, sans-serif;
    background-color: #f0f2f5;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 200px;
    padding: 2px 2px;
    margin-top: 10px;
    margin-left: -10px !important;
}

.row {
    display: flex;
    align-items: center;
}

.no-gutters {
    margin-right: 0;
    margin-left: 0;
}

.col {
    flex: 1;
}

.image-col {
    flex: 0 0 30%;
    /* Set the width to 30% */
}

.text-col {
    flex: 0 0 70%;
    /* Set the width to 70% */
}

.d-flex {
    display: flex;
}

.justify-center {
    justify-content: center;
}

.rounded-circle {
    border-radius: 50%;
}

.skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
}

.skeleton-img {
    width: 35px;
    height: 35px;
}

.skeleton-text {
    height: 20px;
    width: 80%;
    margin-left: 10px;
}

@keyframes loading {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}
</style>