﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Stanica
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        public double X { get; set; }
        public double Y { get; set; }

        public string Adresa { get; set; }

    }
}