const vm = new Vue({

    el: '#app',
    created:function(){
        this.getData();
    },
    
    data: {
        category:"",

        
    },


methods: {  
//Función fetch para recibir los datos del Json

    getData(){
        console.log("Dentro fetch");
        this.$http.get("../public/assets/json/archivo.json")
        .then((respuesta)=> {
            vm.category = respuesta.data.category;
            console.log(vm.category);
            vm.charts();
        }
        )
    },

    //Gráficas
    charts(){
        var chart_d = document.getElementById('chart_doughnut');
        var chart_doughnut = new Chart(chart_d, {
            type: 'doughnut',
            data: {
                labels: ['Physical Disabilities and Diversity', 'Cognitive Disabilities and Diversity'],
                datasets: [{
                    label: 'Analysis',
                    data: [vm.category.DDF,vm.category.DDP],
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
                        data: [vm.category.ASM,vm.category.ASF],
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
                    data: [vm.category.DMC, vm.category.IS, vm.category.PS, vm.category.PR, vm.category.OM, vm.category.QAS, vm.category.CDS, vm.category.RE],
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