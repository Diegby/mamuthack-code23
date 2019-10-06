const vm = new Vue({

    el: '#app',
    created:function(){
    
    },
    
    data: {
        categories:"",
        caracter: "", 
        c_offensive: "",
        c_inoffensive:"",
        check: false

    },


methods: {  
//Función fetch para recibir los datos del Json

    getData(){
        console.log("Dentro fetch");
        this.$http.get("../public/assets/json/archivo.json")
        .then((respuesta)=> {
            vm.categories = respuesta.data.categories;          
            vm.caracter = respuesta.data.caracter;
            vm.counter();
        }
        )
    },
    //Counter data offensive or not offensive
    
    counter(){
        vm.c_offensive = vm.caracter.o;
        vm.c_inoffensive = vm.caracter.i;
    },

    //Gráficas
    charts(){
        vm.check = true;
        var chart_d = document.getElementById('chart_doughnut');
        var chart_doughnut = new Chart(chart_d, {
            type: 'doughnut',
            data: {
                labels: ['Physical Disabilities and Diversity', 'Cognitive Disabilities and Diversity'],
                datasets: [{
                    label: 'Analysis',
                    data: [vm.categories.ddf,vm.categories.ddp],
                    backgroundColor: [                    
                    
                        '#1B9E77',
                        '#D95B01',
                        ],           
            
                    }],
                
                },
                options: {
                    legend: {
                    
                        display: true,
                        labels: {
                            boxWidth:10,
                        }
                    },
                    title: {
                        display: true,
                        text: 'Words Related with Disabilities',
                        position: 'bottom',
                        fontColor: 'black'
                      },
                    maintainAspectRatio: false,
                
                }
            
            });
            
            var chart_p = document.getElementById('chart_pie');
            var chart_pie = new Chart(chart_p, {
                type: 'pie',
                data: {
                    labels: ['Male Genitalia', 'Female Genitalia'],
                    datasets: [{
                        label: 'Genitalia',
                        data: [vm.categories.asm,vm.categories.asf],
                        backgroundColor: [                    
                        
                            '#380546',
                            '#053446',
                            ],           
                
                        }],
                    
                    },
                    options: {
                        legend: {
                        
                            display: true,
                            labels: {
                                boxWidth:10,
                            }
                        },
                        title: {
                            display: true,
                            text: 'Words Related with Genitalia',
                            position: 'bottom',
                            fontColor: 'black'
                          },
                        maintainAspectRatio: false,
                    
                    }
                
                });

            var chart_bh = document.getElementById('chart_barhorizontal');
            var chart_barhorizontal = new Chart(chart_bh, {
            type: 'horizontalBar',
            data: {
                labels: ['Moral and Behavioral Defects', 'Words Related to Social and Economic Disadvantage', 'Negative Stereotypes Ethnic Slurs', 'Words Related to Prostitution', 'Words Related to Homosexuality', 'Words with Potential Negative Connotations', 'Derogatory Words', 'Felonies and Words related to Crime and Immoral Behavior'],
                datasets: [{
                    label: '',
                    data: [vm.categories.dmc, vm.categories.is, vm.categories.ps, vm.categories.pr, vm.categories.om, vm.categories.qas, vm.categories.cds, vm.categories.re],
                    backgroundColor: [
                        '#089F9A',
                        '#4E3D2F',
                        '#7570B3',        
                        '#1391C1',
                        'BLACK',
                        '#C17F13',
                        'green',
                        'grey'
                        ],           
            
                    }],
                
                },
                options: {
                    legend: {
                    
                        display: false,
                        labels: {
                            boxWidth:10,
                        }
                    },
                    title: {
                        display: true,
                        text: 'Others',
                        position: 'bottom',
                        fontColor: 'black'
                      },
                    maintainAspectRatio: false,
                
                }
            
            });
    },

    
}

});