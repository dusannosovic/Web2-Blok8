﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class VrstaPutnika
    {
        [Key]
        public string Naziv{ get; set;}
        public decimal Koeficijent { get; set; }

    }
}